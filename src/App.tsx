import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { HOME } from './pages'



function App() {
  const queryClient = new QueryClient()




  return (
    <QueryClientProvider client={queryClient}>
      <HOME />
    </QueryClientProvider>
  )
}

export default App
