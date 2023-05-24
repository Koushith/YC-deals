import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { QrMessage } from "../qr-message/qr-message.component";

export const Header = () => {
  const [email, setEmail] = useState("");
  const [callbackId, setCallbackId] = useState("");
  const [appUrl, setAppUrl] = useState("");
  const [status, setStatus] = useState("");

  const getStatus = async (callbackId: string) => {
    const { data } = await axios.get(
      `http://192.168.0.179:8000/status/${callbackId}`
    );

    console.log(data.status);
    setStatus(data.status);
  };

  useEffect(() => {
    if (!callbackId) return;
    console.log("effects ran");
    const intervalId = setInterval(() => {
      getStatus(callbackId);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [callbackId]);

  const submitHandler = async () => {
    if (!email) return toast.error("Email is required");

    const { data } = await axios.post("http://192.168.0.179:8000/home", {
      email,
    });
    setCallbackId(data.callbackId);
    setAppUrl(data.url);

    console.log("resssss----", data);
  };

  return (
    <div>
      <h1>YC Deals</h1>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={submitHandler}>Submit</button>

      <div>
        {status === "VERIFIED" ? (
          <>
            <h1>Success</h1>
          </>
        ) : (
          <div>
            {appUrl && callbackId ? <QrMessage appUrl={appUrl} /> : <></>}
          </div>
        )}
      </div>
    </div>
  );
};
