import { db } from "@/services/FireBase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "./view-trip-components/InfoSection";
import Hotels from "./view-trip-components/Hotels";
import PlaceToVisit from "./view-trip-components/PlaceToVisit";
import Footer from "@/view-trip/[tripId]/view-trip-components/Footer";

// using this to get the data from firebase
function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState();

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);
  const getTripData = async () => {
    const docRef = doc(db, "AiTrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No Such document exists");
      toast("No Trip Found");
    }
  };
  return (
    <div>
      <div className="lg:px-52 p-5">
        <InfoSection trip={trip} />
        <Hotels trip={trip} />
        <PlaceToVisit trip={trip} />
      </div>
      <Footer />
    </div>
  );
}

export default ViewTrip;
