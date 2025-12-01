"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Load MDEditor on the client only
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const initialState = {
  error: "",
  status: "INITIAL",
};

const StartUpForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  // ---------------------- FORM ACTION ----------------------
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      setErrors({});

      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      // Validate form with Zod
      await formSchema.parseAsync(formValues);

      // TODO: Replace with your real Sanity action
      // const result = await createPitch(prevState, formData, pitch);

      console.log("FORM OK:", formValues);

      // Fake result object (remove later)
      const result = {
        status: "SUCCESS",
        _id: "fake-id-123",
      };

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully!",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      console.error(error);

      // Zod Validation Errors
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors({
          title: fieldErrors.title?.[0] ?? "",
          description: fieldErrors.description?.[0] ?? "",
          category: fieldErrors.category?.[0] ?? "",
          link: fieldErrors.link?.[0] ?? "",
          pitch: fieldErrors.pitch?.[0] ?? "",
        });

        toast({
          title: "Error",
          description: "Please check your inputs and try again.",
          variant: "destructive",
        });

        return { ...prevState, status: "ERROR", error: "VALIDATION_ERROR" };
      }

      toast({
        title: "Unexpected Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });

      return { ...prevState, status: "ERROR", error: "UNKNOWN_ERROR" };
    }
  };

  // ---------------- ACTION STATE HOOK ----------------
  const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    initialState
  );

  return (
    <form action={formAction} className="startup-form">
      {/* TITLE */}
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Describe your startup briefly"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      {/* CATEGORY */}
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Tech, Health, Finance, etc."
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      {/* IMAGE URL */}
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="https://example.com/image.jpg"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      {/* PITCH EDITOR */}
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          textareaProps={{
            placeholder: "Briefly describe your idea and what problem it solves",
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      {/* SUBMIT BUTTON */}
      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartUpForm;
