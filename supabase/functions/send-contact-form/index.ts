import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  product: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received form data:", formData);

    const emailContent = `
      Nouvelle demande de contact :
      
      Nom : ${formData.name}
      Email : ${formData.email}
      Téléphone : ${formData.phone || 'Non renseigné'}
      Produit d'intérêt : ${formData.product}
    `;

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY || "",
      },
      body: JSON.stringify({
        sender: {
          name: "Industrial Products",
          email: "industrialproducts.club@gmail.com",
        },
        to: [
          {
            email: "industrialproducts.club@gmail.com",
            name: "Industrial Products",
          },
        ],
        subject: "Nouvelle demande de contact - Industrial Products",
        textContent: emailContent,
        replyTo: {
          email: formData.email,
          name: formData.name,
        },
      }),
    });

    if (res.ok) {
      console.log("Email sent successfully");
      return new Response(
        JSON.stringify({ message: "Email sent successfully" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      const error = await res.text();
      console.error("Error sending email:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error in send-contact-form function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);