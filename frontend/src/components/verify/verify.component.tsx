import { toast } from "react-hot-toast";
import { Button, Input } from "../primitives";
import { VerifyContainer } from "./verify.styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export const QRCode = ({ appUrl }: any) => {
  return (
    <div className="form-container">
      <h1 className="title">
        Almost there. verify and avail exclusive Deals!!
      </h1>

      <a className="link" target="_blank" rel="noreferrer" href={appUrl}>
        {" "}
        Click here to open in Reclaim Wallet
      </a>

      <span>OR</span>

      <div className="qr-code">
        <QRCodeSVG value={appUrl} className="react-qr" />
      </div>

      <p className="scan-helper-text">
        <span>Scan the QR </span> to submit your claim on the Reclaim app
      </p>
    </div>
  );
};

export const Verify = () => {
  const [email, setEmail] = useState("");
  const [callbackId, setCallbackId] = useState("");
  const [appUrl, setAppUrl] = useState("");
  const [status, setStatus] = useState("");

  const getStatus = async (callbackId: string) => {
    try {
      const { data } = await axios.get(
        `http://192.168.0.181:8000/status/${callbackId}`
      );

      console.log(data.status);
      setStatus(data.status);
    } catch (error) {
      console.log(error);
    }
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

    const { data } = await axios.post("http://192.168.0.181:8000/home", {
      email,
    });
    setCallbackId(data.callbackId);
    setAppUrl(data.url);

    console.log("resssss----", data);
  };
  return (
    <VerifyContainer>
      {appUrl && callbackId ? (
        <QRCode appUrl={appUrl} />
      ) : (
        <div className="form-container">
          <h1 className="title">The Content is Locked. Verify to View</h1>
          <Input
            placeholder="Enter your Email"
            value={email}
            required
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Button
            label="Verify with BookFace Access"
            style={{ width: "100%" }}
            onClick={submitHandler}
          />
        </div>
      )}

      {status === "VERIFIED" && (
        <>
          <h1>Success</h1>
        </>
      )}
    </VerifyContainer>
  );
};