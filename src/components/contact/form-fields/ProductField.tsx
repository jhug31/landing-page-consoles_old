import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { ContactFormData } from "../ContactFormFields";
import { useProductInfo } from "@/hooks/useProductInfo";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductFieldProps {
  form: UseFormReturn<ContactFormData>;
  files: { name: string; signedUrl: string }[];
}

const ProductField = ({ form, files }: ProductFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="products"
      render={() => (
        <FormItem>
          <FormLabel>Produits d'intérêt</FormLabel>
          <FormControl>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              {files.map((file, index) => {
                const { description } = useProductInfo(file.name);
                return (
                  <FormField
                    key={index}
                    control={form.control}
                    name="products"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={file.name}
                          className="flex flex-row items-start space-x-3 space-y-0 py-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(file.name)}
                              onCheckedChange={(checked) => {
                                const value = field.value || [];
                                if (checked) {
                                  field.onChange([...value, file.name]);
                                } else {
                                  field.onChange(
                                    value.filter((val) => val !== file.name)
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {description || "Nouvelle cartouche"}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                );
              })}
            </ScrollArea>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductField;