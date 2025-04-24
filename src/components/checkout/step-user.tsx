import { Dispatch, SetStateAction } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCheckoutStore } from "@/stores/checkout-store";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChechoutSteps } from "@/types/checkout-steps";

const formSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
});

type Props = {
  setStep: Dispatch<SetStateAction<ChechoutSteps>>;
};

export const StepUser = ({ setStep }: Props) => {
  const { name, setName } = useCheckoutStore((state) => state);

  // Hook do formulário
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setName(values.name);
    setStep("address");
  };

  return (
    // Garante que o FormProvider envolve os componentes filhos
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  placeholder="Digite seu nome"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant={"outline"}>
          Próximo
        </Button>
      </form>
    </FormProvider>
  );
};
