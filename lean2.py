import asyncio
async def task1():
    print("Hi Amani!")
    await asyncio.sleep(3)
    print("I'm John")

async def task2():
    print("I live in Kigali")
    await asyncio.sleep(4)
    print("You live in Nyamagabe")

async def task3():
    await asyncio.sleep(6)
    print("oooooooooo")

async def main():
    await asyncio.gather(task1(),task2(),task3())
asyncio.run(main())
