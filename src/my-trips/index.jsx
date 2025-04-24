import { db } from "@/services/FireBase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User email:", user.email);
    if (!user || !user.email) {
      navigate("/");
      return;
    }

    setUserTrips([]);

    const q = query(
      collection(db, "AiTrips"),
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);

    const trips = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      trips.push(doc.data());
    });

    setUserTrips(trips);
  };

  return (
    <div className="lg:px-52 p-5 text-center">
      <h2 className="text-4xl font-bold">My Trips and Many more to come!!</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-5 mt-7">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCardItem key={index} trip={trip} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;
