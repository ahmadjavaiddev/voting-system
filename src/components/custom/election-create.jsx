"use client";

import React from "react";
import axios from "axios";
import { useState } from "react";
import { CalendarIcon, PartyPopper, Timer, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function ElectionCreate({ handleClose }) {
  const [title, setTitle] = useState("");
  const [parties, setParties] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCreateElection = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await axios.post("/api/admin/create-election", {
        title,
        parties: parties.split(",").map((p) => p.trim()),
        startTime,
        endTime,
      });
      const data = res.data;
      handleClose();
      toast(data.message);
      setMessage(data.message);
      setTitle("");
      setParties("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      setError(err.response?.data?.error || "Election creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-md">
      <Card className="shadow-lg border-t-4 border-t-primary">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl">Create Election</CardTitle>
          </div>
          <CardDescription>
            Set up a new election with custom parties and schedule
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateElection} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-medium">
                Election Title
              </Label>
              <div className="relative">
                <Trophy className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="title"
                  className="pl-10"
                  placeholder="Enter election title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="parties" className="font-medium">
                Participating Parties
              </Label>
              <div className="relative">
                <PartyPopper className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="parties"
                  className="pl-10"
                  placeholder="Party A, Party B, Party C"
                  value={parties}
                  onChange={(e) => setParties(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Separate multiple parties with commas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="font-medium">
                  Start Time
                </Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startTime"
                    className="pl-10"
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="font-medium">
                  End Time
                </Label>
                <div className="relative">
                  <Timer className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endTime"
                    className="pl-10"
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            onClick={handleCreateElection}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Creating Election..." : "Create Election"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
