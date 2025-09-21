import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TregisterSchema } from "../validations/Tregister-validation";
import { doTRegister } from "../api/teacher-api";
import Lightning from "@/components/Lightning"; // ⚡ background

const TRegister = () => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(TregisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      department: "",
      subject: "",
    }
  });

  const registerSubmit = async (userData: unknown) => {
    try {
      const result = await doTRegister(userData);
      if (result.data.message) {
        setStatus(false);
        navigate('/tlogin');
      } else {
        setStatus(true);
      }
    } catch (err) {
      setStatus(true);
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* ⚡ Lightning Background */}
      <div className="absolute inset-0 z-0">
        <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
      </div>

      {/* Registration Card */}
      <Card className="relative z-10 w-full max-w-md mx-auto shadow-lg rounded-2xl bg-white/80 backdrop-blur-md border border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Teacher Registration</CardTitle>
        </CardHeader>

        <CardContent>
          {status && <p className="text-red-500 text-center mb-2">Registration failed. Try again.</p>}

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
              <Label>Department</Label>
              <Input {...register('department')} type="text" placeholder="Department" />
              <span className="text-red-500">{errors.department?.message}</span>
            </div>

            <div className="grid w-full gap-2">
              <Label>Subject</Label>
              <Input {...register('subject')} type="text" placeholder="Subject" />
              <span className="text-red-500">{errors.subject?.message}</span>
            </div>

            <Button className="w-full">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TRegister;
