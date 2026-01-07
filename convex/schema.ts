import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { z } from "zod";

export default defineSchema({
    posts: defineTable({
        title:v.string(),
        body:v.string(),
        authorId:v.string(),
        
    })
})