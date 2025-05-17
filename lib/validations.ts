import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),

  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(130, { message: "Title musn't be longer then 130 characters." }),
  content: z.string().min(100, { message: "Minimum of 100 characters." }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag must have at least 1 character." })
        .max(15, { message: "Tag must not exceed 15 characters." })
    )
    .min(1, { message: "Add at least one tag." })
    .max(3, { message: "Maximum of 3 tags." }),
});

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
  image: z.string().url("Invalid image URL").optional(),
  location: z.string().optional(),
  portfolio: z.string().url("Invalid portfolio URL").optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  userId: z.string(),
  name: z.string().min(1, "Name is required"),
  image: z.string().url("Invalid image URL").optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .optional(),
  provider: z.string().min(1, "Provider is required"),
  providerAccountId: z.string().min(1, "Provider account ID is required"),
});

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["github", "google"]),
  providerAccountId: z.string().min(1, "Provider account ID is required"),
  user: z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    image: z.string().url("Invalid image URL").optional(),
  }),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, "Question ID is required"),
});

export const GetQuestionSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
});

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().min(1, "Page must be at least 1").default(1),
  pageSize: z.number().min(1, "Page size must be at least 1").default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, "Tag ID is required"),
});

export const IncrementViewsSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
});

export const AnswerSchema = z.object({
  content: z.string().min(100, { message: "Minimum of 100 characters." }),
});

export const AnswerServerSchema = AnswerSchema.extend({
  questionId: z.string().min(1, "Question ID is required"),
});

export const GetAnswersSchema = PaginatedSearchParamsSchema.extend({
  questionId: z.string().min(1, "Question ID is required"),
});

export const AIAnswerSchema = z.object({
  question: z
    .string()
    .min(5, {
      message: "Question title must be at least 5 characters.",
    })
    .max(130, {
      message: "Question title musn't be longer then 130 characters.",
    }),
  content: z.string().min(100, {
    message: "Question description must have Minimum of 100 characters.",
  }),
  userAnswer: z.string().optional(),
});

export const CreateVoteSchema = z.object({
  targetId: z.string().min(1, "Target ID is required"),
  targetType: z.enum(["question", "answer"], {
    message: "Invalid target type. Must be 'question' or 'answer'.",
  }),
  voteType: z.enum(["upvote", "downvote"], {
    message: "Invalid vote type. Must be 'upvote' or 'downvote'.",
  }),
});

export const UpdateVoteCountSchema = CreateVoteSchema.extend({
  change: z
    .number()
    .int()
    .min(-1, "Change must be -1 (decrement) or 1 (increment)")
    .max(1, "Change must be -1 (decrement) or 1 (increment)"),
});

export const HasVotedSchema = CreateVoteSchema.pick({
  targetId: true,
  targetType: true,
});

export const CollectionBaseSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
});

export const GetUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export const GetUserQuestionsSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, "User ID is required"),
});

export const GetUsersAnswersSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, "User ID is required"),
});

export const GetUserTagsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export const DeleteQuestionSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
});

export const DeleteAnswerSchema = z.object({
  answerId: z.string().min(1, "Answer ID is required"),
});

export const CreateInteractionSchema = z.object({
  action: z.enum([
    "view",
    "upvote",
    "downvote",
    "bookmark",
    "post",
    "edit",
    "delete",
    "search",
  ]),
  actionTarget: z.enum(["question", "answer"]),
  actionId: z.string().min(1),
  authorId: z.string().min(1),
});

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(130, { message: "Name musn't be longer then 130 characters." }),
  username: z
    .string()
    .min(3, { message: "username musn't be longer then 100 characters." }),
  portfolio: z.string().url({ message: "Please provide valid URL" }),
  location: z.string().min(3, { message: "Please provide proper location" }),
  bio: z.string().min(3, {
    message: "Bio must be at least 3 characters.",
  }),
});

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(130, { message: "Name musn't be longer then 130 characters." }),
  username: z
    .string()
    .min(3, { message: "username musn't be longer then 100 characters." }),
  portfolio: z.string().url({ message: "Please provide valid URL" }),
  location: z.string().min(3, { message: "Please provide proper location" }),
  bio: z.string().min(3, {
    message: "Bio must be at least 3 characters.",
  }),
});

export const GlobalSearchSchema = z.object({
  query: z.string(),
  type: z.string().nullable().optional(),
});
