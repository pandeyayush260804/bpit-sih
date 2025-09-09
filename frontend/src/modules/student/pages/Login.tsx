import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-400 p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Login</CardTitle>
          <CardDescription>Quiz App Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" />
            </div>
            <div className="pt-2">
              <Button className="w-full">Login</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
