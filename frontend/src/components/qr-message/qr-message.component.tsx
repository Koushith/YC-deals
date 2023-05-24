import React from "react";
import { QRCodeSVG } from "qrcode.react";

export const QrMessage = ({ appUrl }: { appUrl: string }) => {
  return (
    <div>
      <div>
        <a target="_blank" rel="noreferrer" href={appUrl}>
          Click here to open on Reclaim Wallet app
        </a>

        <h3>OR</h3>
      </div>

      <div>
        <div>
          <div>
            <QRCodeSVG
              className="w-54 h-54"
              value={appUrl}
              size={250}
              style={{ marginLeft: 20 }}
            />
          </div>
        </div>
        <h3>
          <span>Scan Qr</span> to submit your claim on the Reclaim app
        </h3>
      </div>
    </div>
  );
};
