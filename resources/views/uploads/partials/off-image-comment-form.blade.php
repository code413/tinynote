<form method="POST" action="{{ route('comments.store', [$upload]) }}" class="card flex flex-col mt-10">
    @csrf

    <textarea name="body" placeholder="Type your comment to display out of the image"
              class="p-5 border border-gary-500 focus:shadow-outline"></textarea>

    <input type="submit" class="btn btn-blue ml-auto mt-2 text-center" value="Post">
</form>
