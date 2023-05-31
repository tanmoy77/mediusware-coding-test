import { Route, Routes } from "react-router-dom";
import Index from "./components/Index.jsx";
import Menu from "./components/Menu.jsx";
import Problem1 from "./components/Problem-1.jsx";
import Problem2 from "./components/Problem-2.jsx";
import ModalAllContact from "./components/modals/ModalAllContact.jsx";
import ModalUSContact from "./components/modals/ModalUSContact.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/" element={<Menu />}>
          <Route path="problem-1" element={<Problem1 />} />
          <Route path="problem-2" element={<Problem2 />} />
        </Route>
        <Route path="/all-contacts" element={<ModalAllContact />} />
        <Route path="/us-contacts" element={<ModalUSContact />} />
      </Routes>
    </>
  );
}

export default App;
