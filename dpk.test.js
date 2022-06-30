const { deterministicPartitionKey } = require("./dpk");

describe("[deterministicPartitionKey]", () => {
    it("Returns the literal '0' when given no input", () => {
        const trivialKey = deterministicPartitionKey();
        expect(trivialKey).toBe("0");
    });

    it("Returns the literal '0' when given an empty string as input", () => {
        const trivialKey = deterministicPartitionKey("");
        expect(trivialKey).toBe("0");
    });

    it("Returns the literal '0' when given an boolean 'false' as input", () => {
        const trivialKey = deterministicPartitionKey(false);
        expect(trivialKey).toBe("0");
    });

    it("Don't return the literal '0' when it's given an input", () => {
        const trivialKey = deterministicPartitionKey("1");
        expect(trivialKey).not.toBe("0");
    });

    it("Don't return the literal '0' when it's given an empty event as input", () => {
        const input = {};

        const trivialKey = deterministicPartitionKey(input);
        expect(trivialKey).not.toBe("0");
    });

    it("Returns the literal 'abc' when given an event with a partitionKey 'abc' as input", () => {
        const input = {
            partitionKey: "abc",
        };

        const trivialKey = deterministicPartitionKey(input);
        expect(trivialKey).toBe(input.partitionKey);
    });

    it("Don't return the partition key when it's bigger it's length it's bigger than 256", () => {
        const input = {
            partitionKey:`Bohemian rhapsody
           Is this the real life?
           Is this just fantasy?
           Caught in a landslide
           No escape from reality
           Open your eyes
           Look up to the skies and see
           I'm just a poor boy, I need no sympathy
           Because I'm easy come, easy go
           A little high, little low
           Anyway the wind blows, doesn't really matter to me, to me
           
           Mama, just killed a man
           Put a gun against his head
           Pulled my trigger, now he's dead
           Mama, life had just begun
           But now I've gone and thrown it all away
           Mama, ooo
           Didn't mean to make you cry
           If I'm not back again this time tomorrow
           Carry on, carry on, as if nothing really matters`,
        };

        const trivialKey = deterministicPartitionKey(input);
        expect(trivialKey).not.toBe(input.partitionKey);
    });
});