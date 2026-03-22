import { createBrowserRouter } from 'react-router-dom'
import App, { Google, Hello } from '../App.tsx'
import { ProtectPath } from '../App.tsx'

// create router
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: async () => {
      return {
        name: 'Huy'
      }
    },
    children: [
      {
        element: <ProtectPath auth={false} />,
        children: [
          {
            path: 'hello',
            element: <Hello />
          }
        ]
      },
      {
        path: 'google',
        element: <Google />
      }
    ]
  },
])