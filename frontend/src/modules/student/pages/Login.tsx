import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ import Link
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/login-validation";
import { doLogin } from "../api/student-api";

const Login = () => {
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mysubmit = async (userObject: any) => {
    try {
      const result = await doLogin(userObject);

      if (result?.data?.message) {
        if (result.data.role) localStorage.setItem("role", result.data.role);
        if (result.data.token) localStorage.setItem("token", result.data.token);
        localStorage.setItem("email", userObject.email);

        setMessage(result.data.message);
        console.log("Login success");

        navigate("/sdashboard");
      } else {
        setMessage("Invalid username or password");
        setShowPopup(true);
        console.log("Login Fail");
      }
    } catch (err) {
      setMessage("Login failed. Please try again.");
      setShowPopup(true);
      console.log("Login Fails", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-400 p-4 relative">
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Card className="bg-white w-full max-w-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-lg text-red-600">
                Login Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">{message}</p>
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPopup(false)}
                  className="border-red-400 text-red-600 hover:bg-red-100"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Login</CardTitle>
          <CardDescription>Student Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(mysubmit)} className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Email"
              />
              <span className="text-red-500">{errors.email?.message}</span>
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Password"
              />
              <span className="text-red-500">{errors.password?.message}</span>
            </div>
            <div className="pt-2">
              <Button className="w-full">Login</Button>
            </div>
          </form>

          {/* ✅ Register Link */}
          <div className="text-center mt-4">
            <p className="text-gray-700">
              Not registered?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
