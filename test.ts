function climbStairs(n: number): number {
    if(n==1)
        return 1
    else 
        return climbStairs(n-1) + 1
    
};