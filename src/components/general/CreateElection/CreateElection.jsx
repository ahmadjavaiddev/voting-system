"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  CirclePlus,
  Clock,
  Clipboard,
  Loader2,
  PartyPopper,
  Plus,
  Save,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import axios from "axios";
import moment from "moment";
import "moment-timezone";

// Define the form schema with Zod
const memberSchema = z.object({
  name: z.string().min(1, "Member name is required"),
  image: z.string().url("Image URL is required"),
  role: z.string().min(1, "Role is required"),
});

const candidateSchema = z.object({
  name: z.string().min(1, "Party name is required"),
  slogan: z.string().min(1, "Slogan is required"),
  color: z.string().min(1, "Color is required"),
  image: z.string().url("Image URL is required"),
  members: z.array(memberSchema).min(1, "At least one member is required"),
  platform: z.array(z.string().min(1, "Platform point is required")),
});

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  rules: z.array(z.string().min(1, "Rule cannot be empty")),
  candidates: z
    .array(candidateSchema)
    .min(2, "At least two candidates are required"),
});

// Available colors for candidates
const colorOptions = [
  { value: "bg-red-500", label: "Red", textColor: "text-white" },
  { value: "bg-blue-500", label: "Blue", textColor: "text-white" },
  { value: "bg-green-500", label: "Green", textColor: "text-white" },
  { value: "bg-yellow-500", label: "Yellow", textColor: "text-black" },
  { value: "bg-purple-500", label: "Purple", textColor: "text-white" },
  { value: "bg-pink-500", label: "Pink", textColor: "text-white" },
  { value: "bg-indigo-500", label: "Indigo", textColor: "text-white" },
  { value: "bg-orange-500", label: "Orange", textColor: "text-white" },
  { value: "bg-teal-500", label: "Teal", textColor: "text-white" },
  { value: "bg-cyan-500", label: "Cyan", textColor: "text-black" },
];

export default function CreateElectionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      rules: ["Each student may cast one vote only"],
      candidates: [
        {
          name: "",
          slogan: "",
          color: "bg-blue-500",
          image: "",
          members: [{ name: "", image: "", role: "" }],
          platform: [""],
        },
        {
          name: "",
          slogan: "",
          color: "bg-green-500",
          image: "",
          members: [{ name: "", image: "", role: "" }],
          platform: [""],
        },
      ],
    },
  });

  // Only one useFieldArray per field name
  const {
    fields: ruleFields,
    append: appendRule,
    remove: removeRule,
  } = useFieldArray({
    control: form.control,
    name: "rules",
  });

  const {
    fields: candidateFields,
    append: appendCandidate,
    remove: removeCandidate,
  } = useFieldArray({
    control: form.control,
    name: "candidates",
  });

  // Handle form submission
  const onSubmit = async (data) => {
    console.log("Submitting election data:", data);
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");
    try {
      // Get user's time zone
      const userTimeZone = moment.tz.guess();

      // Convert local times to UTC
      const startTimeUTC = moment
        .tz(data.startTime, userTimeZone)
        .utc()
        .toISOString();
      const endTimeUTC = moment
        .tz(data.endTime, userTimeZone)
        .utc()
        .toISOString();

      const submissionData = {
        ...data,
        startTime: startTimeUTC,
        endTime: endTimeUTC,
      };

      // Send to backend
      const res = await axios.post(
        "/api/admin/create-election",
        submissionData
      );
      setSubmitSuccess("Election created successfully!");
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (error) {
      setSubmitError(
        error?.response?.data?.error ||
          "Failed to create election. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Create New Election</h1>
        <p className="mt-1 text-muted-foreground">
          Fill in the details below to create a new election for your
          organization.
        </p>
      </div>

      {submitError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
      {submitSuccess && (
        <Alert variant="default" className="mb-6">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{submitSuccess}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clipboard className="h-5 w-5" /> Basic Information
              </CardTitle>
              <CardDescription>
                Enter the general details about this election
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Election Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Student Council Election 2025"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose a clear, descriptive title for the election.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date & Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="datetime-local"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date & Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="datetime-local"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide details about the purpose and importance of this election..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Explain the purpose of the election and any relevant
                      context.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Rules Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" /> Election Rules
              </CardTitle>
              <CardDescription>
                Define the rules that govern this election
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ruleFields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <FormField
                    control={form.control}
                    name={`rules.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Enter a rule" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeRule(index)}
                    disabled={ruleFields.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => appendRule("")}
              >
                <Plus className="mr-1 h-4 w-4" /> Add Rule
              </Button>
            </CardContent>
          </Card>

          {/* Candidates Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PartyPopper className="h-5 w-5" /> Candidates / Parties
              </CardTitle>
              <CardDescription>
                Add the candidates or parties participating in this election
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {candidateFields.map((candidateField, candidateIndex) => (
                <Collapsible
                  key={candidateField.id}
                  className="border rounded-lg"
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-4 w-4 rounded-full ${
                            form.watch(`candidates.${candidateIndex}.color`) ||
                            "bg-gray-300"
                          }`}
                        ></div>
                        <h3 className="font-medium">
                          {form.watch(`candidates.${candidateIndex}.name`) ||
                            `Candidate ${candidateIndex + 1}`}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-normal">
                          {
                            form
                              .watch(`candidates.${candidateIndex}.members`)
                              .filter(Boolean).length
                          }{" "}
                          Members
                        </Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={candidateFields.length <= 2}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (candidateFields.length > 2) {
                              removeCandidate(candidateIndex);
                            }
                          }}
                          title={
                            candidateFields.length <= 2
                              ? "At least 2 candidates required"
                              : "Remove candidate"
                          }
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Separator />
                    <div className="p-4 space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name={`candidates.${candidateIndex}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Party/Candidate Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Progress Party"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`candidates.${candidateIndex}.color`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a color" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {colorOptions.map((color) => (
                                    <SelectItem
                                      key={color.value}
                                      value={color.value}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div
                                          className={`h-4 w-4 rounded-full ${color.value}`}
                                        ></div>
                                        <span>{color.label}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`candidates.${candidateIndex}.slogan`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Slogan</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Building a Better Tomorrow"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`candidates.${candidateIndex}.image`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Party/Candidate Image URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://example.com/image.jpg"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Members */}
                      <div className="space-y-2">
                        <FormLabel>Members</FormLabel>
                        {form
                          .watch(`candidates.${candidateIndex}.members`)
                          .map((member, memberIndex) => (
                            <div
                              key={memberIndex}
                              className="relative flex flex-col md:flex-row gap-2 mb-2 border p-2 rounded"
                            >
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow"
                                disabled={
                                  form.getValues(
                                    `candidates.${candidateIndex}.members`
                                  ).length <= 1
                                }
                                onClick={() => {
                                  const currentMembers = form.getValues(
                                    `candidates.${candidateIndex}.members`
                                  );
                                  if (currentMembers.length > 1) {
                                    const updated = [...currentMembers];
                                    updated.splice(memberIndex, 1);
                                    form.setValue(
                                      `candidates.${candidateIndex}.members`,
                                      updated
                                    );
                                  }
                                }}
                                title={
                                  form.getValues(
                                    `candidates.${candidateIndex}.members`
                                  ).length <= 1
                                    ? "At least 1 member required"
                                    : "Remove member"
                                }
                              >
                                <Trash2 className="h-3 w-3 text-red-600" />
                              </Button>
                              <FormField
                                control={form.control}
                                name={`candidates.${candidateIndex}.members.${memberIndex}.name`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g., Sarah Johnson"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`candidates.${candidateIndex}.members.${memberIndex}.image`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="https://example.com/member.jpg"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`candidates.${candidateIndex}.members.${memberIndex}.role`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="e.g., Leader"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const currentMembers = form.getValues(
                              `candidates.${candidateIndex}.members`
                            );
                            form.setValue(
                              `candidates.${candidateIndex}.members`,
                              [
                                ...currentMembers,
                                { name: "", image: "", role: "" },
                              ]
                            );
                          }}
                        >
                          <Plus className="mr-1 h-4 w-4" /> Add Member
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <FormLabel>Platform Points</FormLabel>
                        {form
                          .watch(`candidates.${candidateIndex}.platform`)
                          ?.map((_, pointIndex) => (
                            <div
                              key={pointIndex}
                              className="flex items-start gap-2"
                            >
                              <FormField
                                control={form.control}
                                name={`candidates.${candidateIndex}.platform.${pointIndex}`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input
                                        placeholder="e.g., Increase student activity funding by 15%"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  const currentPlatform = form.getValues(
                                    `candidates.${candidateIndex}.platform`
                                  );
                                  const newPlatform = [...currentPlatform];
                                  newPlatform.splice(pointIndex, 1);
                                  form.setValue(
                                    `candidates.${candidateIndex}.platform`,
                                    newPlatform
                                  );
                                }}
                                disabled={
                                  form.watch(
                                    `candidates.${candidateIndex}.platform`
                                  ).length <= 1
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const currentPlatform = form.getValues(
                              `candidates.${candidateIndex}.platform`
                            );
                            form.setValue(
                              `candidates.${candidateIndex}.platform`,
                              [...currentPlatform, ""]
                            );
                          }}
                        >
                          <Plus className="mr-1 h-4 w-4" /> Add Platform Point
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  appendCandidate({
                    name: "",
                    slogan: "",
                    color: "bg-blue-500",
                    image: "",
                    members: [{ name: "", image: "", role: "" }],
                    platform: [""],
                  })
                }
              >
                <CirclePlus className="mr-1 h-4 w-4" /> Add Candidate
              </Button>
            </CardContent>
          </Card>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create Election"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
