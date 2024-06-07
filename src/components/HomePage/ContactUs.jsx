import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const ContactUs = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex items-center justify-center ">
          <Card className="mb-16 w-full border-0 md:mb-24 md:w-4/5 md:p-3 lg:w-4/5 xl:w-3/5">
            <CardHeader className="space-y-2">
              <CardTitle className="text-center text-3xl  font-semibold uppercase">
                Get in touch with us!
              </CardTitle>
              <CardDescription className="text-md text-center">
                Reach Out for Inquiries, Assistance, or Collaborations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="my-8 grid gap-5"
              >
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Type your name here."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Type your email here."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    placeholder="Type your message here."
                    id="message"
                  />
                </div>
                <Button type="submit">Send</Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <div>
                  <CardDescription className="flex items-center justify-center gap-2 text-center">
                    Red Wave Corporation Ltd.
                    <br />
                    Azampur, Uttara, Dhaka, Bangladesh.
                    <br />
                    880 17903 49650
                    <br />
                    abdulmuhaimintoha.business@gmail.com
                  </CardDescription>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
