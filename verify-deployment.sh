#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🚀 ProjectX Frontend Deployment Verification"
echo "============================================="
echo ""

# Check if URL is provided
if [ -z "$1" ]; then
    echo "Usage: ./verify-deployment.sh <your-deployed-url>"
    echo "Example: ./verify-deployment.sh https://myapp.vercel.app"
    exit 1
fi

URL=$1
echo "Testing deployment at: $URL"
echo ""

# Test function
test_route() {
    local route=$1
    local expected_status=$2
    local description=$3
    
    echo -n "Testing $description ($route)... "
    
    status=$(curl -s -o /dev/null -w "%{http_code}" "$URL$route")
    
    if [ "$status" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (Status: $status)"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Expected: $expected_status, Got: $status)"
        return 1
    fi
}

# Run tests
passed=0
failed=0

# Test 1: Root should return 200
if test_route "/" 200 "Root path"; then
    ((passed++))
else
    ((failed++))
fi

# Test 2: /login should return 200 (not 404)
if test_route "/login" 200 "Login page (direct access)"; then
    ((passed++))
else
    ((failed++))
fi

# Test 3: /register should return 200 (not 404)
if test_route "/register" 200 "Register page (direct access)"; then
    ((passed++))
else
    ((failed++))
fi

# Test 4: /forgot-password should return 200 (not 404)
if test_route "/forgot-password" 200 "Forgot password page"; then
    ((passed++))
else
    ((failed++))
fi

# Test 5: /home should return 200 (will redirect on client side)
if test_route "/home" 200 "Home page (direct access)"; then
    ((passed++))
else
    ((failed++))
fi

# Test 6: /profile should return 200 (will redirect on client side)
if test_route "/profile" 200 "Profile page (direct access)"; then
    ((passed++))
else
    ((failed++))
fi

# Test 7: /communities should return 200 (will redirect on client side)
if test_route "/communities" 200 "Communities page (direct access)"; then
    ((passed++))
else
    ((failed++))
fi

# Test 8: Non-existent route should still return 200 (SPA handles it)
if test_route "/this-does-not-exist" 200 "Non-existent route (SPA fallback)"; then
    ((passed++))
else
    ((failed++))
fi

# Check if health endpoint exists (Docker deployment)
echo ""
echo "Additional checks:"
echo -n "Checking health endpoint... "
health_status=$(curl -s -o /dev/null -w "%{http_code}" "$URL/health")
if [ "$health_status" -eq "200" ]; then
    echo -e "${GREEN}✓ Available${NC} (Docker/Nginx deployment detected)"
else
    echo -e "${YELLOW}⊘ Not found${NC} (Not a Docker deployment)"
fi

# Check if index.html is being served
echo -n "Checking index.html content... "
content=$(curl -s "$URL/login")
if [[ $content == *"<div id=\"root\"></div>"* ]]; then
    echo -e "${GREEN}✓ Correct${NC} (index.html is being served)"
else
    echo -e "${RED}✗ Error${NC} (index.html not found or incorrect)"
    ((failed++))
fi

# Summary
echo ""
echo "============================================="
echo "Test Results:"
echo -e "Passed: ${GREEN}$passed${NC}"
echo -e "Failed: ${RED}$failed${NC}"
echo ""

if [ $failed -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! Deployment is working correctly.${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please check the deployment configuration.${NC}"
    echo ""
    echo "Common fixes:"
    echo "1. Ensure server is configured to serve index.html for all routes"
    echo "2. Check that build output (dist/) contains index.html"
    echo "3. Verify deployment platform configuration (vercel.json, netlify.toml, etc.)"
    echo ""
    echo "See DEPLOYMENT_GUIDE.md for detailed instructions."
    exit 1
fi
