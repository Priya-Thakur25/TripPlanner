import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user);
  }, []);

  const [opendilog, setOpenDilog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (sucRes) => getUserProfile(sucRes),
    onError: (error) => console.log("Error", error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDilog(false);
        window.location.reload();
      });
  };

  return (
    <div className="p-3 shadow-lg flex justify-between px-5">
      <h1 className="font-bold text-3xl ">🛩️ Trip Planner</h1>
      {user ? (
        <div className="flex items-center justify-center gap-3">
          <Link to="/create-trip">
            <Button variant="outline" className="rounded-3xl">
              + Create Trip
            </Button>
          </Link>
          <Link to="/my-trips">
            <Button variant="outline" className="rounded-3xl">
              My Trips
            </Button>
          </Link>
          <Popover>
            <PopoverTrigger>
              {" "}
              <img src={user?.picture} className="rounded-full h-11" />
            </PopoverTrigger>
            <PopoverContent>
              <h2
                className="cursor-pointer"
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                LogOut
              </h2>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button onClick={() => setOpenDilog(true)}>Sign in</Button>
      )}
      <Dialog open={opendilog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <div className="px-5">
              <img src="/logo.svg" className="mb-2" />
              <h2 className="text-lg text-gray-600 font-bold mx-2">
                Sign in with Google
              </h2>
              <p className="text-gray-500 mx-1">
                Sign in to the App with Google Authentication securely
              </p>
              <Button className="mt-4 w-full rounded-full" onClick={login}>
                <FcGoogle className="h-7 w-7" />
                Sign in with Google
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
