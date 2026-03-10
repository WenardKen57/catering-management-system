import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_BASE = '/api'

const initialReservationForm = {
  packages: '',
  eventDate: '',
  venueName: '',
  venueAddress: '',
  venueNotes: '',
  pax: 1,
  totalPrice: '',
  status: 'reserved',
  notes: '',
}

const initialPackageForm = {
  name: '',
  description: '',
  price: '',
  menu: '',
  services: '',
}

const initialPaymentForm = {
  reservation: '',
  amount: '',
  method: 'cash',
  status: 'pending',
}

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })

  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' })

  const [activeTab, setActiveTab] = useState('dashboard')
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [packages, setPackages] = useState([])
  const [reservations, setReservations] = useState([])
  const [payments, setPayments] = useState([])
  const [events, setEvents] = useState([])

  const [packageForm, setPackageForm] = useState(initialPackageForm)
  const [reservationForm, setReservationForm] = useState(initialReservationForm)
  const [paymentForm, setPaymentForm] = useState(initialPaymentForm)

  const role = user?.role || 'customer'
  const isAdmin = role === 'admin'

  const tabs = useMemo(() => {
    const baseTabs = [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'packages', label: 'Packages' },
      { key: 'reservations', label: 'Reservations' },
      { key: 'payments', label: 'Payments' },
    ]

    if (isAdmin) {
      baseTabs.push({ key: 'events', label: 'Events' })
    }

    return baseTabs
  }, [isAdmin])

  useEffect(() => {
    if (!token) return
    loadInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const clearNotices = () => {
    setStatusMessage('')
    setErrorMessage('')
  }

  const notifySuccess = (message) => {
    setStatusMessage(message)
    setErrorMessage('')
  }

  const notifyError = (message) => {
    setErrorMessage(message)
    setStatusMessage('')
  }

  const apiRequest = async (endpoint, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    })

    const contentType = response.headers.get('content-type')
    const data = contentType?.includes('application/json')
      ? await response.json()
      : await response.text()

    if (!response.ok) {
      const message =
        typeof data === 'string'
          ? data
          : data.message || data.error || 'Request failed'
      throw new Error(message)
    }

    return data
  }

  const loadInitialData = async () => {
    clearNotices()
    try {
      await Promise.all([
        fetchPackages(),
        fetchReservations(),
        fetchPayments(),
        ...(isAdmin ? [fetchEvents()] : []),
      ])
      notifySuccess('Data synced from backend API.')
    } catch (error) {
      notifyError(error.message)
    }
  }

  const fetchPackages = async () => {
    const data = await apiRequest('/packages')
    setPackages(data)
  }

  const fetchReservations = async () => {
    const data = await apiRequest('/reservations')
    setReservations(data)
  }

  const fetchPayments = async () => {
    const data = await apiRequest('/payments')
    setPayments(data)
  }

  const fetchEvents = async () => {
    const data = await apiRequest('/events')
    setEvents(data)
  }

  const onAuthSubmit = async (event) => {
    event.preventDefault()
    clearNotices()

    try {
      if (authMode === 'register') {
        await apiRequest('/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            name: authForm.name,
            email: authForm.email,
            password: authForm.password,
          }),
        })
        notifySuccess('Registration successful. You can now log in.')
        setAuthMode('login')
      } else {
        const data = await apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: authForm.email,
            password: authForm.password,
          }),
        })

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        setToken(data.token)
        setUser(data.user)
        notifySuccess(`Welcome back, ${data.user.name}.`)
      }
    } catch (error) {
      notifyError(error.message)
    }
  }

  const onLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken('')
    setUser(null)
    setPackages([])
    setReservations([])
    setPayments([])
    setEvents([])
    setActiveTab('dashboard')
    notifySuccess('Signed out.')
  }

  const onCreatePackage = async (event) => {
    event.preventDefault()
    clearNotices()

    try {
      await apiRequest('/packages', {
        method: 'POST',
        body: JSON.stringify({
          name: packageForm.name,
          description: packageForm.description,
          price: Number(packageForm.price),
          menu: packageForm.menu.split(',').map((item) => item.trim()).filter(Boolean),
          services: packageForm.services
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      })

      setPackageForm(initialPackageForm)
      await fetchPackages()
      notifySuccess('Package created.')
    } catch (error) {
      notifyError(error.message)
    }
  }

  const onCreateReservation = async (event) => {
    event.preventDefault()
    clearNotices()

    try {
      const packageIds = reservationForm.packages
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean)

      await apiRequest('/reservations', {
        method: 'POST',
        body: JSON.stringify({
          customer: user._id,
          packages: packageIds,
          eventDate: reservationForm.eventDate,
          venue: {
            name: reservationForm.venueName,
            address: reservationForm.venueAddress,
            notes: reservationForm.venueNotes,
          },
          pax: Number(reservationForm.pax),
          totalPrice: Number(reservationForm.totalPrice),
          status: reservationForm.status,
          notes: reservationForm.notes,
        }),
      })

      setReservationForm(initialReservationForm)
      await fetchReservations()
      notifySuccess('Reservation created.')
    } catch (error) {
      notifyError(error.message)
    }
  }

  const onCreatePayment = async (event) => {
    event.preventDefault()
    clearNotices()

    try {
      await apiRequest('/payments', {
        method: 'POST',
        body: JSON.stringify({
          reservation: paymentForm.reservation,
          amount: Number(paymentForm.amount),
          method: paymentForm.method,
          status: paymentForm.status,
        }),
      })

      setPaymentForm(initialPaymentForm)
      await fetchPayments()
      notifySuccess('Payment created.')
    } catch (error) {
      notifyError(error.message)
    }
  }

  if (!token) {
    return (
      <main className="app-shell auth-shell">
        <section className="panel auth-panel">
          <h1>Catering Management System</h1>
          <p>Sign in to test the backend MVP from this frontend client.</p>

          <div className="mode-switch">
            <button
              className={authMode === 'login' ? 'active' : ''}
              onClick={() => setAuthMode('login')}
              type="button"
            >
              Login
            </button>
            <button
              className={authMode === 'register' ? 'active' : ''}
              onClick={() => setAuthMode('register')}
              type="button"
            >
              Register
            </button>
          </div>

          <form className="grid-form" onSubmit={onAuthSubmit}>
            {authMode === 'register' && (
              <label>
                Full Name
                <input
                  required
                  type="text"
                  value={authForm.name}
                  onChange={(e) =>
                    setAuthForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </label>
            )}

            <label>
              Email
              <input
                required
                type="email"
                value={authForm.email}
                onChange={(e) =>
                  setAuthForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </label>

            <label>
              Password
              <input
                required
                minLength={6}
                type="password"
                value={authForm.password}
                onChange={(e) =>
                  setAuthForm((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </label>

            <button type="submit">
              {authMode === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </form>

          {statusMessage && <p className="notice success">{statusMessage}</p>}
          {errorMessage && <p className="notice error">{errorMessage}</p>}
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <header className="panel header-panel">
        <div>
          <h1>Catering Management System MVP</h1>
          <p>
            Logged in as <strong>{user?.name}</strong> ({role})
          </p>
        </div>

        <div className="header-actions">
          <button type="button" onClick={loadInitialData}>
            Refresh
          </button>
          <button type="button" className="danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <nav className="panel tab-row">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {statusMessage && <p className="notice success">{statusMessage}</p>}
      {errorMessage && <p className="notice error">{errorMessage}</p>}

      {activeTab === 'dashboard' && (
        <section className="panel stats-grid">
          <article>
            <h3>Packages</h3>
            <p>{packages.length}</p>
          </article>
          <article>
            <h3>Reservations</h3>
            <p>{reservations.length}</p>
          </article>
          <article>
            <h3>Payments</h3>
            <p>{payments.length}</p>
          </article>
          {isAdmin && (
            <article>
              <h3>Events</h3>
              <p>{events.length}</p>
            </article>
          )}
        </section>
      )}

      {activeTab === 'packages' && (
        <section className="panel split-layout">
          <div>
            <h2>Package List</h2>
            <ul className="data-list">
              {packages.map((pkg) => (
                <li key={pkg._id}>
                  <div>
                    <strong>{pkg.name}</strong>
                    <p>{pkg.description || 'No description'}</p>
                    <small>ID: {pkg._id}</small>
                  </div>
                  <span>${pkg.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {isAdmin && (
            <form className="grid-form" onSubmit={onCreatePackage}>
              <h2>Create Package</h2>
              <label>
                Name
                <input
                  required
                  value={packageForm.name}
                  onChange={(e) =>
                    setPackageForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </label>
              <label>
                Description
                <textarea
                  value={packageForm.description}
                  onChange={(e) =>
                    setPackageForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                />
              </label>
              <label>
                Price
                <input
                  required
                  min="0"
                  step="0.01"
                  type="number"
                  value={packageForm.price}
                  onChange={(e) =>
                    setPackageForm((prev) => ({ ...prev, price: e.target.value }))
                  }
                />
              </label>
              <label>
                Menu Items (comma-separated)
                <input
                  value={packageForm.menu}
                  onChange={(e) =>
                    setPackageForm((prev) => ({ ...prev, menu: e.target.value }))
                  }
                />
              </label>
              <label>
                Services (comma-separated)
                <input
                  value={packageForm.services}
                  onChange={(e) =>
                    setPackageForm((prev) => ({ ...prev, services: e.target.value }))
                  }
                />
              </label>
              <button type="submit">Create Package</button>
            </form>
          )}
        </section>
      )}

      {activeTab === 'reservations' && (
        <section className="panel split-layout">
          <div>
            <h2>Reservation List</h2>
            <ul className="data-list">
              {reservations.map((reservation) => (
                <li key={reservation._id}>
                  <div>
                    <strong>{new Date(reservation.eventDate).toLocaleString()}</strong>
                    <p>{reservation.venue?.address}</p>
                    <small>Status: {reservation.status}</small>
                  </div>
                  <span>${reservation.totalPrice}</span>
                </li>
              ))}
            </ul>
          </div>

          <form className="grid-form" onSubmit={onCreateReservation}>
            <h2>Create Reservation</h2>
            <label>
              Package IDs (comma-separated)
              <input
                required
                value={reservationForm.packages}
                onChange={(e) =>
                  setReservationForm((prev) => ({ ...prev, packages: e.target.value }))
                }
              />
            </label>
            <label>
              Event Date
              <input
                required
                type="datetime-local"
                value={reservationForm.eventDate}
                onChange={(e) =>
                  setReservationForm((prev) => ({ ...prev, eventDate: e.target.value }))
                }
              />
            </label>
            <label>
              Venue Name
              <input
                value={reservationForm.venueName}
                onChange={(e) =>
                  setReservationForm((prev) => ({ ...prev, venueName: e.target.value }))
                }
              />
            </label>
            <label>
              Venue Address
              <input
                required
                value={reservationForm.venueAddress}
                onChange={(e) =>
                  setReservationForm((prev) => ({ ...prev, venueAddress: e.target.value }))
                }
              />
            </label>
            <label>
              Venue Notes
              <textarea
                value={reservationForm.venueNotes}
                onChange={(e) =>
                  setReservationForm((prev) => ({ ...prev, venueNotes: e.target.value }))
                }
              />
            </label>
            <label>
              Pax
              <input
                required
                min="1"
                type="number"
                value={reservationForm.pax}
                onChange={(e) =>
                  setReservationForm((prev) => ({ ...prev, pax: e.target.value }))
                }
              />
            </label>
            <label>
              Total Price
              <input
                required
                min="0"
                step="0.01"
                type="number"
                value={reservationForm.totalPrice}
                onChange={(e) =>
                  setReservationForm((prev) => ({ ...prev, totalPrice: e.target.value }))
                }
              />
            </label>
            <label>
              Notes
              <textarea
                value={reservationForm.notes}
                onChange={(e) =>
                  setReservationForm((prev) => ({ ...prev, notes: e.target.value }))
                }
              />
            </label>
            <button type="submit">Create Reservation</button>
          </form>
        </section>
      )}

      {activeTab === 'payments' && (
        <section className="panel split-layout">
          <div>
            <h2>Payment List</h2>
            <ul className="data-list">
              {payments.map((payment) => (
                <li key={payment._id}>
                  <div>
                    <strong>{payment.method}</strong>
                    <p>Reservation: {payment.reservation?._id || payment.reservation}</p>
                    <small>Status: {payment.status}</small>
                  </div>
                  <span>${payment.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          <form className="grid-form" onSubmit={onCreatePayment}>
            <h2>Create Payment</h2>
            <label>
              Reservation ID
              <input
                required
                value={paymentForm.reservation}
                onChange={(e) =>
                  setPaymentForm((prev) => ({ ...prev, reservation: e.target.value }))
                }
              />
            </label>
            <label>
              Amount
              <input
                required
                min="0"
                step="0.01"
                type="number"
                value={paymentForm.amount}
                onChange={(e) =>
                  setPaymentForm((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
            </label>
            <label>
              Method
              <select
                value={paymentForm.method}
                onChange={(e) =>
                  setPaymentForm((prev) => ({ ...prev, method: e.target.value }))
                }
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
              </select>
            </label>
            <label>
              Status
              <select
                value={paymentForm.status}
                onChange={(e) =>
                  setPaymentForm((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </label>
            <button type="submit">Create Payment</button>
          </form>
        </section>
      )}

      {activeTab === 'events' && isAdmin && (
        <section className="panel">
          <h2>Events</h2>
          <ul className="data-list">
            {events.map((event) => (
              <li key={event._id}>
                <div>
                  <strong>{event.eventName || 'Untitled event'}</strong>
                  <p>{event.location}</p>
                  <small>{new Date(event.eventDate).toLocaleString()}</small>
                </div>
                <span>{event.status}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default App
