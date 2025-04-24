import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/Options";
import axios from "axios";
import { toast } from "sonner";
import { chatSession } from "@/services/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/FireBase";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
// import { error } from "console";

function CreateTrip() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [opendilog, setOpenDilog] = useState(false);
  const [loading,setloading] = useState(false);
  const [formData, setformData] = useState([
    {
      location: "",
      days: "",
      budget: "",
      people: "",
    },
  ]);


  const navigate = useNavigate();
  const fetchSuggestions = async (value) => {
    try {
      const apiKey = "AlzaSy2J9pFOTvXdGG4BlsS9Oo6U1sRZ8jeetrT"; // Set this in your .env file
      const res = await axios.get(
        "https://maps.gomaps.pro/maps/api/place/queryautocomplete/json",
        {
          params: {
            input: value,
            key: apiKey,
          },
        }
      );
      setSuggestions(res.data.predictions || []);
    } catch (error) {
      console.error("Autocomplete error:", error);
    }
  };
  const data = useRef(1);

  const handleSuggestion = (item) => {
    setInputValue(item);
    setformData({ ...formData, location: item });
    // console.log(formData);
    data.current = 0;
  };
  useEffect(() => {
    if (inputValue.length >= 1 && data.current != 0) {
      const timer = setTimeout(() => {
        fetchSuggestions(inputValue);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (sucRes) => getUserProfile(sucRes),
    onError: (error) => console.log("Error",error)
  })

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDilog(true);
      return;
    }
    if (formData?.days > 5) {
      toast("Please Choose trip days less than 7");
    }
    if (
      (formData?.days > 5 && !formData?.budget) ||
      !formData?.people ||
      !formData?.location
    ) {
      toast("Please fill all details");
      return;
    }
    setloading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{days}", formData?.days)
      .replace("{people}", formData?.people)
      .replace("{budget}", formData?.budget)
      .replace("{days}", formData?.days);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setloading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async(TripData) => {
    setloading(true);
    if(setloading){
      toast("Please wait....We are working on it")
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AiTrips", docId), {
     userSelection: formData,
     tripData: JSON.parse(TripData),
     userEmail: user?.email,
     id:docId
    });
    setloading(false);
    navigate('/view-trip/'+ docId);
  }
  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp)
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDilog(false);
      onGenerateTrip();
    })
  }

  return (
    <div className="px-56 p-10">
      <h2 className="text-3xl font-bold">
        Tell us your Travel Preferences 🏕️🌴
      </h2>
      <p className="text-lg font-medium text-gray-700 mt-3">
        Just Provide some basic information and our Trip Planner will generate a
        customized itinerary based on your preferences
      </p>

      <div className="mt-12">
        <p className="text-lg font-medium mb-3">
          What is the Destination of your choice?
        </p>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search destination"
          className="border-slate-300"
        />
        {data.current !== 0 && suggestions.length > 0 && (
          <ul className="border rounded mt-1 max-h-48 overflow-y-auto bg-white shadow">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="p-2 hover:bg-slate-100 cursor-pointer"
                onClick={() => handleSuggestion(item.description)}
              >
                {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-10">
        <p className="text-lg font-medium">
          How many days are you planning your Trip?
        </p>
        <Input
          className="mt-3 border-slate-300"
          placeholder={"Ex-3"}
          onChange={(e) => setformData({ ...formData, days: e.target.value })}
        />
      </div>

      <div>
        <h2 className="mt-10 text-lg font-medium py-3">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-10 my-3">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`border p-3 cursor-pointer hover:shadow-xl rounded-lg ${
                formData?.budget == item.title &&
                "border-gray-500 rounded-xl shadow-lg"
              }`}
              onClick={() => setformData({ ...formData, budget: item.title })}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="text-xl font-bold">{item.title}</h2>
              <h2 className="text-base text-slate-700">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mt-10 text-lg font-medium py-3">
          Who do you plan on Travelling on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-10 my-2">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              className={`border p-3 cursor-pointer hover:shadow-xl rounded-lg ${
                formData?.people == item.title &&
                "border-gray-500 rounded-xl shadow-lg"
              }`}
              onClick={() => setformData({ ...formData, people: item.people })}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="text-xl font-bold">{item.title}</h2>
              <h2 className="text-base text-slate-700">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={onGenerateTrip}>{loading? <VscLoading className="animate-spin"/> : "Generate Trip"}</Button>
      </div>

      <Dialog open={opendilog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <div className="px-5">
              <img src="/logo.svg" className="mb-2"/>
              <h2 className="text-lg text-gray-600 font-bold mx-2">Sign in with Google</h2>
              <p className="text-gray-500 mx-1">Sign in to the App with Google Authentication securely</p>
              <Button className="mt-4 w-full rounded-full" onClick={login}><FcGoogle className="h-7 w-7"/>Sign in with Google</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
