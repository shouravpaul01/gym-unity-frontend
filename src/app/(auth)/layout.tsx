"use client"
import { ReactNode } from "react";
import fitnessAnimation from "../../assets/lottie/Bodybuilding - Gym Power.json";
import Lottie from "lottie-react";

export default function AuthLayout({children}:{children:ReactNode}) {
  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden ">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Lottie Animation */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center border-e-2 border-dashed border-success relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-warning/20 rounded-full blur-3xl"></div>
            </div>

            <div className="absolute  right-0 top-0 bottom-0 w-24 bg-success/20 blur-2xl"></div>
            <div className="text-center relative z-10">
              <div className="w-64 h-64 mx-auto mb-6">
                <Lottie
                  animationData={fitnessAnimation}
                  loop={true}
                  autoplay={true}
                />
              </div>
              <h2 className="text-3xl font-bold mb-4">Welcome to GymUnity</h2>
              <p className=" text-lg">
                Your journey to fitness starts here. Join our community and
                achieve your goals.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:w-1/2 bg-white/5 backdrop-blur-sm p-8 lg:p-12 flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
