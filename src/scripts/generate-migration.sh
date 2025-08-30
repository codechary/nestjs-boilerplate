#!/bin/bash

# Custom script to generate migrations dynamically
npm run typeorm -- migration:create ./src/migrations/$1.ts
