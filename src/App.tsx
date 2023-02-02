import './App.css'
import { Routes, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { PUBLIC_ROUTE_ARR, PRIVATE_ROUTE_ARR } from './Route'
import { PrivateRoute } from './components/util/CustomRoute'
function App() {
  return (
    <CookiesProvider>
      <Routes>
        {PUBLIC_ROUTE_ARR.map((route, index) => {
          return (
            <Route path={route.path} element={<route.element />} key={index} />
          )
        })}

        {PRIVATE_ROUTE_ARR.map((route, index) => {
          return (
            <Route
              path={route.path}
              element={
                <PrivateRoute>
                  <route.element />
                </PrivateRoute>
              }
              key={index}
            />
          )
        })}
      </Routes>
    </CookiesProvider>
  )
}

export default App
