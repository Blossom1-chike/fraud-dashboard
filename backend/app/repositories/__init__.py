# This folder is the only place allowed to talk to the database directly —
# things like "find a user by email" or "save a new dataset". Services call
# into here instead of writing database queries themselves.
