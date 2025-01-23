import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { useStorageFiles } from "@/hooks/useStorageFiles";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  product: z.string().min(1, "Veuillez sélectionner un produit"),
});

const Index = () => {
  const { files, loading, error } = useStorageFiles('coffres-a-outils');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      product: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-form', {
        body: values,
      });

      if (error) throw error;

      toast({
        title: "Demande envoyée !",
        description: "Nous vous répondrons sous 24h.",
      });
      
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-industrial-900">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-32 flex flex-col">
        <div className="text-left mb-32 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-white">
            Coffres à outils et Servantes d'atelier
          </h1>
          <Separator className="my-4 w-16 bg-gray-600" />
          <p className="text-gray-400 text-base tracking-widest">
            INDUSTRIAL PRODUCTS
          </p>
        </div>

        {error && (
          <div className="text-red-500 mb-8">
            Une erreur est survenue lors du chargement des produits.
          </div>
        )}

        <div 
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto animate-fadeIn" 
          style={{ animationDelay: "0.2s" }}
        >
          {loading ? (
            Array(12).fill(null).map((_, index) => (
              <ProductCard key={index} />
            ))
          ) : (
            files.map((file, index) => (
              <ProductCard
                key={index}
                imageUrl={file.signedUrl}
                fileName={file.name}
              />
            ))
          )}
        </div>
      </main>

      {/* Floating CTA Button with Dialog */}
      <div className="fixed bottom-8 right-8 z-50">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-white hover:bg-white/90 text-[#222222] font-bold px-8 py-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              Demandez une offre
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Demande d'information</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="votre@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone (optionnel)</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre numéro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produit d'intérêt</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un produit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {files.map((file, index) => (
                            <SelectItem key={index} value={file.name}>
                              {file.name.replace('.png', '')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Footer avec mentions légales */}
      <footer className="mt-16 border-t border-gray-800 bg-industrial-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Informations légales</h3>
              <p className="text-gray-400 text-sm">
                INDUSTRIAL PRODUCTS SARL<br />
                Capital social : 50 000€<br />
                RCS Paris B 123 456 789
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Siège social</h3>
              <p className="text-gray-400 text-sm">
                123 Avenue des Outillages<br />
                75001 Paris, France<br />
                SIRET : 123 456 789 00001
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-gray-400 text-sm">
                Tél : +33 (0)1 23 45 67 89<br />
                Email : contact@example.com<br />
                TVA : FR 12 345 678 901
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Mentions légales</h3>
              <p className="text-gray-400 text-sm">
                © 2024 INDUSTRIAL PRODUCTS<br />
                Tous droits réservés<br />
                <span className="hover:text-white cursor-pointer">Politique de confidentialité</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;