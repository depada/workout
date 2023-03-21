import { createContext, useContext, useEffect, useState } from "react";

export const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    weight: "",
    height: "",
    leanMuscleMass: "",
    fatPercent: "",
    age: "",
    sex: "",
    muscleFibreType: "",
    trainingIntensity: "",
    trainingStatus: "",
    displayName: "",
    muscleRecovery: "",
  });
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
