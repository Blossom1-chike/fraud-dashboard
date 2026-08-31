"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { initialUsers, ROLE_STYLES, type User } from "../../constants/dashboard";
import AddUserModal from "./AddUserModal";

type ConfirmState = {
  title: string;
  body: string;
  tone: "danger" | "default";
  confirmLabel: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [addOpen, setAddOpen] = useState(false);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmState | null>(
    null
  );
  const [saving, setSaving] = useState(false);

  const openDisableConfirm = (user: User) => {
    setMenuFor(null);
    setConfirmDialog({
      title: `${user.status === "Active" ? "Disable" : "Re-enable"} ${user.name}'s account?`,
      body:
        user.status === "Active"
          ? "They'll be signed out immediately and won't be able to log in until re-enabled."
          : "They'll regain access immediately.",
      tone: user.status === "Active" ? "danger" : "default",
      confirmLabel:
        user.status === "Active" ? "Disable account" : "Re-enable",
      email: user.email,
    });
  };

  const handleConfirm = () => {
    if (!confirmDialog) return;
    setSaving(true);
    setTimeout(() => {
      setUsers((prev) =>
        prev.map((u) =>
          u.email === confirmDialog.email
            ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" }
            : u
        )
      );
      setSaving(false);
      setConfirmDialog(null);
    }, 700);
  };

  return (
    <div>
      {menuFor && (
        <button
          aria-label="Close menu"
          onClick={() => setMenuFor(null)}
          className="fixed inset-0 z-0 cursor-default"
        />
      )}

      <AlertDialog
        open={confirmDialog !== null}
        onOpenChange={(open) => !open && setConfirmDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmDialog?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog?.body}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant={confirmDialog?.tone === "danger" ? "danger" : "solid"}
              onClick={handleConfirm}
              disabled={saving}
            >
              {saving ? "Saving…" : confirmDialog?.confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AddUserModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(user) => setUsers((prev) => [...prev, user])}
      />

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="m-0 text-[23px] font-semibold">User Management</h1>
          <p className="mt-[5px] text-[12.5px] text-ink-muted">
            Manage analyst, auditor, and admin accounts
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)}>+ Add user</Button>
      </div>

      <div className="mb-4 flex gap-2">
        {[`All (${users.length})`, "Analysts", "Auditors", "Admins"].map(
          (label, i) => (
            <div
              key={label}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] ${
                i === 0
                  ? "bg-teal font-medium text-white"
                  : "border border-border text-ink-muted"
              }`}
            >
              {label}
            </div>
          )
        )}
      </div>

      <Card>
        <Table className="border-collapse text-[12.5px]">
          <TableHeader className="[&_tr]:border-b-0">
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="h-auto px-0 pb-2 text-left text-[10.5px] font-medium uppercase text-ink-faint">
                Name
              </TableHead>
              <TableHead className="h-auto px-2 pb-2 text-left text-[10.5px] font-medium uppercase text-ink-faint">
                Email
              </TableHead>
              <TableHead className="h-auto px-2 pb-2 text-left text-[10.5px] font-medium uppercase text-ink-faint">
                Role
              </TableHead>
              <TableHead className="h-auto px-2 pb-2 text-left text-[10.5px] font-medium uppercase text-ink-faint">
                Status
              </TableHead>
              <TableHead className="h-auto px-2 pb-2 text-left text-[10.5px] font-medium uppercase text-ink-faint">
                Last active
              </TableHead>
              <TableHead className="h-auto px-0 pb-2" />
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border-t [&_tr:last-child]:border-border">
            {users.map((u) => (
              <TableRow
                key={u.email}
                className="border-t border-b-0 border-border hover:bg-transparent"
              >
                <TableCell className="px-0 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-[26px] w-[26px] items-center justify-center rounded-full text-[11px] font-semibold text-white ${u.avatarColor}`}
                    >
                      {u.initials}
                    </div>
                    {u.name}
                  </div>
                </TableCell>
                <TableCell className="px-2 py-3 text-ink-muted">
                  {u.email}
                </TableCell>
                <TableCell className="px-2 py-3">
                  <Badge
                    className={`h-auto w-fit rounded-full border-transparent px-[10px] py-[3px] text-[11px] font-normal ${ROLE_STYLES[u.role]}`}
                  >
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell
                  className={`px-2 py-3 ${
                    u.status === "Active" ? "text-mint" : "text-ink-faint"
                  }`}
                >
                  ● {u.status}
                </TableCell>
                <TableCell className="px-2 py-3 text-ink-faint">
                  {u.active}
                </TableCell>
                <TableCell className="relative px-0 py-3">
                  <button
                    onClick={() =>
                      setMenuFor(menuFor === u.email ? null : u.email)
                    }
                    className="relative z-10 text-sm text-ink-faint"
                  >
                    ⋯
                  </button>
                  {menuFor === u.email && (
                    <div className="absolute top-[22px] right-0 z-10 min-w-[150px] rounded-[9px] border border-border bg-surface shadow-lg">
                      <button
                        onClick={() => openDisableConfirm(u)}
                        className={`block w-full px-3 py-2.5 text-left font-sans text-xs ${
                          u.status === "Active" ? "text-coral" : "text-teal"
                        }`}
                      >
                        {u.status === "Active"
                          ? "Disable account"
                          : "Re-enable account"}
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
