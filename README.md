---
title: Lendsqr
description: lending app
author: Joshua Eze
created:  2025 Mar 29
updated: 2025 Apr 2
---

Lendsqr
=========

## development
I started with the project structure, and moved the routes into the (pages) folder to allow for a global state provider controlling authentication. As this is a limited implemented of a fullsatck app, the global state is used to reset the route stack.

## testing
Unit tests were done on all the page components, excluding UI components. However due to frequent use of the setState, tests couldn't run for tracking the current page, editable displayed users on pagination, as a stack of setStates are being called to compensate for the standard design of retrieving updates from a database. Hence, because of the stack of setStates, updates aren't stored on time in the state variables.

## How to run the app

Run (npm run dev) from the main directory to compile for development. To test run (npm run test). 

## Deployment





