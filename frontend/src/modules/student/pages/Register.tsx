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
    <div>
      <Alert variant="destructive">
        <Angry />
        <AlertTitle>Register Message</AlertTitle>
        <AlertDescription>
          Register Fail!!!
        </AlertDescription>
      </Alert>
    </div>
  );

  const registerSubmit = async (userData:unknown) => {
    console.log("Form Submit", userData);
    try {
      const result = await doRegister(userData);
      if (result.data.message) {
        setStatus(false);
        navigate('/login');
      } else {
        setStatus(true);
        console.log("register fail");
      }
      console.log("Result", result);
    } catch (err) {
      console.log("Register Fail", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-400 p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Register Here</CardTitle>
          <CardDescription>Quiz App Form</CardDescription>
        </CardHeader>

        <CardContent>
          {status && alertJSX}
          <form className="space-y-4" onSubmit={handleSubmit(registerSubmit)}>
            <div className="grid w-full gap-2">
              <Label htmlFor="name">Name</Label>
              <Input {...register('name')} type="text" id="name" placeholder="Name" />
              <span className="text-red-500">{errors.name?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register('email')} type="email" id="email" placeholder="Email" />
              <span className="text-red-500">{errors.email?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="password">Password</Label>
              <Input {...register('password')} type="password" id="password" placeholder="Password" />
              <span className="text-red-500">{errors.password?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="class">Class</Label>
              <Input {...register('class')} type="text" id="class" placeholder="Class" />
              <span className="text-red-500">{errors.class?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="year">Year</Label>
              <Input {...register('year')} type="number" id="year" placeholder="Year" />
              <span className="text-red-500">{errors.year?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="rollNo">Roll No.</Label>
              <Input {...register('rollNo')} type="text" id="rollNo" placeholder="Roll Number" />
              <span className="text-red-500">{errors.rollNo?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="branch">Branch</Label>
              <Input {...register('branch')} type="text" id="branch" placeholder="Branch" />
              <span className="text-red-500">{errors.branch?.message}</span>
            </div>

            <div className="pt-2">
              <Button className="w-full">Register</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
