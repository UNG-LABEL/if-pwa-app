import React from "react";
import "./IgniteLogo.css";

type Props = {
  variant?: "full" | "icon" | "overlay";
  size?: "normal" | "small";
};

const IgniteLogo: React.FC<Props> = ({
  variant = "full",
  size = "normal",
}) => {

  return (
    <div className={`ignite-logo ${variant} ${size}`}>
      <svg
        viewBox="0 0 320 420"
        className="logo-svg"
        xmlns="http://www.w3.org/2000/svg"
      >

{variant === "overlay" && (
<>
<defs>

{/* グラデーション */}
<linearGradient id="blueFire" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stopColor="#EFFFFF"/>
<stop offset="25%" stopColor="#9FE6FF"/>
<stop offset="55%" stopColor="#3DBBFF"/>
<stop offset="85%" stopColor="#0050FF"/>
<stop offset="100%" stopColor="#0010AA"/>
</linearGradient>

{/* ブラー */}
<filter id="flameBlur">
<feGaussianBlur stdDeviation="18"/>
</filter>

{/* 乱流 */}
<filter id="flameDistort">
<feTurbulence
type="turbulence"
baseFrequency="0.015"
numOctaves="3"
seed="7"
/>
<feDisplacementMap
in="SourceGraphic"
scale="18"
/>
</filter>

</defs>

{/* 炎オーラ */}
<ellipse
cx="160"
cy="300"
rx="120"
ry="190"
fill="#1E90FF"
opacity="0.12"
filter="url(#flameBlur)"
/>

{/* 青炎本体 */}
<path
className="flame-outer"
d="
M160 360
C110 330 105 290 125 250
C140 220 150 200 150 160
C150 120 150 100 160 80
C170 100 170 120 170 160
C170 200 180 220 195 250
C215 290 210 330 160 360
Z"
/>

<path
className="flame-inner"
d="
M160 340
C130 310 130 270 145 240
C155 210 158 190 158 150
C158 120 158 100 160 90
C162 100 162 120 162 150
C162 190 165 210 175 240
C190 270 190 310 160 340
Z"
/>

<circle className="spark s1" cx="120" cy="200" r="4"/>
<circle className="spark s2" cx="200" cy="190" r="3"/>
<circle className="spark s3" cx="150" cy="160" r="2"/>
</>
)}

{variant !== "icon" && (
<>
<text
x="160"
y="380"
textAnchor="middle"
className="ignite-text main"
>
IGNITE
</text>

<text
x="160"
y="410"
textAnchor="middle"
className="ignite-text sub"
>
WITHIN
</text>
</>
)}

      </svg>
    </div>
  );
};

export default IgniteLogo;