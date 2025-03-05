import redis.asyncio as redis

class RedisClient:
    def __init__(self, url: str):
        self.url = url
        self.client = None

    async def initialize(self):
        self.client = redis.from_url(self.url)
        return self.client

    async def close(self):
        await self.client.close()