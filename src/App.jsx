import { Route, Routes } from "react-router-dom"
import DateModePage from "./pages/DateModePage"
import Home from "./pages/Home"
import LightningModePage from "./pages/LightningModePage"
import GroupModePage from "./pages/GroupModePage"
import DetailChampionship from "./pages/DetailChampionship"
import PositionsTable from "./pages/PositionsTable"
import ListOfTeams from "./pages/ListOfTeams"

function App() {

  return (
    <div className="bg-[#252525] px-5 py-10 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/date-mode/:id" element={<DateModePage />} />
        <Route path="/lightning-mode" element={<LightningModePage />} />
        <Route path="/group-mode" element={<GroupModePage />} />
        <Route path="detail-championship/:id" element={<DetailChampionship />} />
        <Route path="/positions-table/:id" element={<PositionsTable />} />
        <Route path="/list-of-teams/:id" element={<ListOfTeams />} />
      </Routes>
    </div>
  )
}

export default App
