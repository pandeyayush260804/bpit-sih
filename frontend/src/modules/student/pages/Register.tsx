import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/register-validation";
import { doRegister } from "../api/student-api";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Angry } from "lucide-react";
import { useState } from "react";
import Prism from "@/components/Prism";

const Register = () => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      class: "",
      year: "",
      rollNo: "",
      branch: "",
    }
  });

  const alertJSX = (
    <Alert variant="destructive">
      <Angry />
      <AlertTitle>Register Message</AlertTitle>
      <AlertDescription>
        Register Fail!!!
      </AlertDescription>
    </Alert>
  );

  const registerSubmit = async (userData: unknown) => {
    try {
      const result = await doRegister(userData);
      if (result.data.message) {
        setStatus(false);
        navigate('/login');
      } else {
        setStatus(true);
      }
    } catch (err) {
      setStatus(true);
      console.log("Register Fail", err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* ⚡ Lightning Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={220}
          colorFrequency={1}
          noise={0.1}
          glow={1.2} // brighter glow
        />
      </div>

      {/* Register Card */}
      <Card className="relative z-10 w-full max-w-md mx-auto shadow-lg rounded-2xl bg-white/80 backdrop-blur-md border border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Student Registration</CardTitle>
          <CardDescription>Fill all fields to register</CardDescription>
        </CardHeader>

        <CardContent>
          {status && alertJSX}
          <form className="space-y-4" onSubmit={handleSubmit(registerSubmit)}>
            <div className="grid w-full gap-2">
              <Label>Name</Label>
              <Input {...register('name')} type="text" placeholder="Name" />
              <span className="text-red-500">{errors.name?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label>Email</Label>
              <Input {...register('email')} type="email" placeholder="Email" />
              <span className="text-red-500">{errors.email?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label>Password</Label>
              <Input {...register('password')} type="password" placeholder="Password" />
              <span className="text-red-500">{errors.password?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label>Class</Label>
              <select {...register('class')} className="border px-3 py-2 rounded">
                <option value="">Select Class</option>
                <option value="CSE-A">CSE-A</option>
                <option value="CSE-B">CSE-B</option>
                <option value="CSE-C">CSE-C</option>
              </select>
              <span className="text-red-500">{errors.class?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label>Year</Label>
              <Input {...register('year')} type="number" placeholder="Year" />
              <span className="text-red-500">{errors.year?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label>Roll Number</Label>
              <Input {...register('rollNo')} type="text" placeholder="Roll No." />
              <span className="text-red-500">{errors.rollNo?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label>Branch</Label>
              <Input {...register('branch')} type="text" placeholder="Branch" />
              <span className="text-red-500">{errors.branch?.message}</span>
            </div>

            <Button className="w-full">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
