import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "@/constants/Options";
import axios from "axios";
import { toast } from "sonner";
import { ChatSession } from "@google/generative-ai";
import { chatSession } from "@/services/AIModal";

function CreateTrip() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setformData] = useState([
    {
      location: "",
      days: "",
      budget: "",
      people: "",
    },
  ]);

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

  const onGenerateTrip = async() => {
    if(formData?.days > 7){
      toast("Please Choose trip days less than 7")
    }
    if(formData?.days > 7 && !formData?.budget || !formData?.people || !formData?.location){
      toast("Please fill all details")
      return;
    }
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location)
    .replace('{days}', formData?.days)
    .replace('{people}', formData?.people)
    .replace('{budget}', formData?.budget)
    .replace('{days}', formData?.days)

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--",result?.response?.text());
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
              className={`border p-3 cursor-pointer hover:shadow-xl rounded-lg ${formData?.budget == item.title && 'border-gray-500 rounded-xl shadow-lg'}`}
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
              className={`border p-3 cursor-pointer hover:shadow-xl rounded-lg ${formData?.people == item.title && 'border-gray-500 rounded-xl shadow-lg'}`}
              onClick={() => setformData({ ...formData, people: item.title})}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="text-xl font-bold">{item.title}</h2>
              <h2 className="text-base text-slate-700">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
