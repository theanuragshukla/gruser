import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "./common/Navbar";
import UserProfile from "./components/UserProfile";
import Test from './Test'
import { UserContext } from "./utils/UserContext";
function App() {
  const [user, setUser] = useState({
    connected: false,
    address: null,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box>
        <Navbar />
     <UserProfile
  name="John Doe"
  avatarUrl="https://example.com/avatar.jpg"
  bio="Software engineer, coffee lover, and music enthusiast"
  info={{
    "Date of Birth": "January 1, 1990",
    "Address": "123 Main St, Anytown USA",
    "Twitter": "https://twitter.com/johndoe",
    "LinkedIn": "https://www.linkedin.com/in/johndoe",
    "GitHub": "https://github.com/johndoe",
  }}
/>
	  <Test/>
      </Box>
    </UserContext.Provider>
  );
}

export default App;
