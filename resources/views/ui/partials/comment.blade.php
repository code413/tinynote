<div class="bg-gray-200 p-4 rounded-lg flex flex-col mb-2">
    <div>
        {!! $content ?? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore molestiae quae quia quo, repellat.' !!}
    </div>

    <div class="mt-4 flex">
        <small class="text-gray-500">
            4 mins ago
        </small>
        <small class="text-blue-500 ml-auto">
            {{ $author ?? 'john@example.com' }}
        </small>
    </div>

</div>