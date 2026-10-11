import React, { useState } from "react";
export interface CompanyLogoAsset {
  src: string;
  alt: string;
}
export function CompanyLogo({ asset }: { asset: CompanyLogoAsset }) {
  const [loaded, setLoaded] = useState(false),
    [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div hidden={!loaded} className="company-logo-asset">
      <img
        src={asset.src}
        alt={asset.alt}
        loading="eager"
        onLoad={(event) => {
          if (
            event.currentTarget.naturalWidth < 12 ||
            event.currentTarget.naturalHeight < 12
          )
            setFailed(true);
          else setLoaded(true);
        }}
        onError={() => setFailed(true)}
        style={{
          maxHeight: 64,
          maxWidth: 240,
          width: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
