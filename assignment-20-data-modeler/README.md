# Assignment 20 - Data Modeler 📝

## Description
MongoDB schema design for a blogging platform using Mongoose.

## Models

### User
- name, email (unique), password, avatar, bio, role (user/admin), isActive
- Timestamps: createdAt, updatedAt

### Post
- title, slug (auto-generated), content, excerpt, coverImage
- author → ref: User
- category → ref: Category
- tags (array), status (draft/published/archived), views, likes (User refs)
- publishedAt (set when status → published)
- Virtual: likeCount

### Comment
- content, author → ref: User, post → ref: Post
- parentComment → ref: Comment (for nested replies)
- likes (User refs), isEdited

### Category
- name (unique), slug (auto-generated), description, color

## Relationships
```
User ──< Post (author)
Category ──< Post
Post ──< Comment
User ──< Comment (author)
Comment ──< Comment (replies via parentComment)
User >──< Post (likes - many-to-many)
```

## Setup
```bash
npm install
cp .env.example .env   # Add your MongoDB URI
npm run dev
```
