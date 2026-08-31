"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "../../constants/dashboard";

const AVATAR_COLORS = ["bg-mint", "bg-teal", "bg-amber", "bg-coral"];

function initialsFromName(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AddUserModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (user: User) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<User["role"]>("Analyst");

  const reset = () => {
    setName("");
    setEmail("");
    setRole("Analyst");
  };

  const handleAdd = () => {
    if (!name.trim() || !email.trim()) return;
    onAdd({
      name,
      email,
      role,
      status: "Active",
      active: "Just now",
      initials: initialsFromName(name),
      avatarColor:
        AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    });
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          reset();
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription>
            Invite a new analyst, auditor, or admin to FraudShield AI.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div>
            <label className="mb-1.5 block text-[11px] text-ink-faint">
              Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] text-ink-faint">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@fraudshield.ai"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] text-ink-faint">
              Role
            </label>
            <Select
              value={role}
              onValueChange={(v) => v && setRole(v as User["role"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Analyst">Analyst</SelectItem>
                <SelectItem value="Auditor">Auditor</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add user</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
