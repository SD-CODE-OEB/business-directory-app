import BusinessDirectory from "./components/BusinessDirectory"
import { ThemeProvider } from "./contexts/ThemeContext"

function App() {
  return (
    <ThemeProvider>
      <BusinessDirectory />
    </ThemeProvider>
  )
}

export default App
