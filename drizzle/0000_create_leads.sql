CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`source` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`contact` text NOT NULL,
	`topic` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`details` text DEFAULT '{}' NOT NULL,
	`consent` integer NOT NULL,
	`created_at` integer NOT NULL
);
