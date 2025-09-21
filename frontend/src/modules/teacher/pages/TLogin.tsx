import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TloginSchema } from "../validations/Tlogin-validation";
import { doTLogin } from "../api/teacher-api";
import Lightning from "@/components/Lightning"; // ⚡ background

const TLogin = () => {
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(TloginSchema),
    defaultValues: { email: "", password: "" },
  });

  const mysubmit = async (userObject: any) => {
    try {
      const result = await doTLogin(userObject);
      if (result?.data?.message) {
        if (result.data.role) localStorage.setItem("role", result.data.role);
        if (result.data.token) localStorage.setItem("token", result.data.token);
        localStorage.setItem("email", userObject.email);
        setMessage(result.data.message);
        navigate("/tdashboard");
      } else {
        setMessage("Invalid email or password");
        setShowPopup(true);
      }
    } catch (err) {
      setMessage("Login failed. Please try again.");
      setShowPopup(true);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* ⚡ Lightning background */}
      <div className="absolute inset-0 z-0">
        <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
      </div>

      {/* Popup Alert */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Card className="bg-white w-full max-w-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-lg text-red-600">Login Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">{message}</p>
              <div className="flex justify-center mt-4">
                <Button variant="outline" onClick={() => setShowPopup(false)}>Close</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md mx-auto shadow-lg rounded-2xl bg-white/80 backdrop-blur-md border border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Teacher Login</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(mysubmit)} className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register("email")} type="email" id="email" placeholder="Email" />
              <span className="text-red-500">{errors.email?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="password">Password</Label>
              <Input {...register("password")} type="password" id="password" placeholder="Password" />
              <span className="text-red-500">{errors.password?.message}</span>
            </div>

            <Button className="w-full">Login</Button>
          </form>

          <div className="text-center mt-4">
            <p>
              New here?{" "}
              <Link to="/tregister" className="text-blue-600 font-medium hover:underline">
                Register
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TLogin;
