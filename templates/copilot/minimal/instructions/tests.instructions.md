---
applyTo: "**/*.{test,spec}.{ts,tsx,js,jsx}"
---
# Test file conventions

- Colocate tests with source or in `__tests__/` matching project layout
- Never delete or skip failing tests to make CI pass
- Run the narrowest relevant test file during iteration
- Run full test suite before marking feature done
- Name tests for behavior, not implementation details
