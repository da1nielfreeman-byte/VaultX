import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import { ProtectedRoute } from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={
          <ProtectedRoute redirectTo="/">
            <ProfilePage />
          </ProtectedRoute>
        }/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;