import { createContext, useContext, useState } from "react";

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  return useContext(StatsContext);
}
